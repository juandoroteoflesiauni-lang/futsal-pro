"""Full-app smoke + interaction tests for Futsal Pro."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright, expect

BASE = "http://127.0.0.1:5173/"
OUT = Path(__file__).resolve().parent / "test-artifacts"
OUT.mkdir(exist_ok=True)

ROUTES = [
    ("#/", "Hoy"),
    ("#/plan", "Plan 9 meses"),
    ("#/simf", "Movimiento SIMF"),
    ("#/rutina", "Rutina matutina"),
    ("#/progreso", "Progreso"),
]


def overlaps(page) -> list[dict]:
    """Detect overlapping interactive elements via getBoundingClientRect."""
    return page.evaluate(
        """() => {
      const inBottomNav = (el) => !!el.closest('.bottom-nav');
      const els = [...document.querySelectorAll('button, a, input, textarea, [role="button"]')]
        .filter(el => {
          if (inBottomNav(el)) return false;
          const s = getComputedStyle(el);
          if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return false;
          const r = el.getBoundingClientRect();
          return r.width > 2 && r.height > 2;
        });
      const hits = [];
      for (let i = 0; i < els.length; i++) {
        for (let j = i + 1; j < els.length; j++) {
          const a = els[i].getBoundingClientRect();
          const b = els[j].getBoundingClientRect();
          if (els[i].contains(els[j]) || els[j].contains(els[i])) continue;
          const ox = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
          const oy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
          const area = ox * oy;
          if (area > 40) {
            hits.push({
              a: (els[i].innerText || els[i].getAttribute('aria-label') || els[i].className || '').slice(0, 60),
              b: (els[j].innerText || els[j].getAttribute('aria-label') || els[j].className || '').slice(0, 60),
              area,
              aTag: els[i].tagName,
              bTag: els[j].tagName,
            });
          }
        }
      }
      return hits.slice(0, 30);
    }"""
    )


def overflow_issues(page) -> list[dict]:
    return page.evaluate(
        """() => {
      const issues = [];
      const docW = document.documentElement.clientWidth;
      [...document.querySelectorAll('*')].forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width < 2) return;
        if (r.right > docW + 2 || r.left < -2) {
          const text = (el.innerText || el.className || '').toString().slice(0, 50);
          if (el.children.length > 8) return; // skip huge containers
          issues.push({
            text,
            tag: el.tagName,
            className: (el.className || '').toString().slice(0, 80),
            left: Math.round(r.left),
            right: Math.round(r.right),
            docW,
          });
        }
      });
      // unique by class+tag
      const seen = new Set();
      return issues.filter(i => {
        const k = i.tag + '|' + i.className;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      }).slice(0, 25);
    }"""
    )


def run_viewport(p, width: int, height: int, label: str) -> dict:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={"width": width, "height": height},
        device_scale_factor=1,
        locale="es-AR",
    )
    page = context.new_page()
    page.add_init_script("localStorage.clear()")
    console_errors: list[str] = []
    page_errors: list[str] = []
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda err: page_errors.append(str(err)))

    results: dict = {
        "viewport": label,
        "routes": {},
        "interactions": {},
        "overlaps": {},
        "overflow": {},
        "console_errors": [],
        "page_errors": [],
    }

    for hash_path, title in ROUTES:
        page.goto(BASE + hash_path, wait_until="networkidle")
        page.wait_for_timeout(300)
        expect(page.get_by_role("heading", name=title, level=1)).to_be_visible(timeout=8000)
        shot = OUT / f"{label}_{hash_path.replace('#/','').replace('/','') or 'hoy'}.png"
        page.screenshot(path=str(shot), full_page=True)
        ov = overlaps(page)
        of = overflow_issues(page)
        results["routes"][hash_path] = {"ok": True, "screenshot": str(shot)}
        results["overlaps"][hash_path] = ov
        results["overflow"][hash_path] = of

    # Interactions on Hoy
    page.goto(BASE + "#/", wait_until="networkidle")
    page.wait_for_timeout(200)

    # Toggle meso / week
    page.get_by_role("button", name=re.compile(r"^MC\s*3$")).click()
    page.get_by_role("button", name=re.compile(r"^Sem\s*2$")).click()
    expect(page.get_by_text(re.compile(r"MC\s*3\s*·\s*S\s*2")).first).to_be_visible()
    results["interactions"]["plan_selector"] = "ok"

    # Expand first exercise
    expand = page.locator(".ex-top").first
    expand.click()
    expect(page.get_by_text("Técnica").first).to_be_visible()
    results["interactions"]["expand_exercise"] = "ok"

    # Check first exercise
    check = page.locator(".ex-check").first
    check.click()
    page.wait_for_timeout(150)
    cls = check.get_attribute("class") or ""
    assert "on" in cls, f"checkbox not marked: {cls}"
    results["interactions"]["check_exercise"] = "ok"

    # Close session flow
    page.get_by_role("button", name="Cerrar sesión").click()
    expect(page.get_by_label("Dolor de rodilla post-sesión")).to_be_visible()
    page.get_by_role("button", name="Guardar sesión").click()
    expect(page.get_by_text("Completada").first).to_be_visible(timeout=5000)
    results["interactions"]["complete_session"] = "ok"

    # Rutina flow
    page.goto(BASE + "#/rutina", wait_until="networkidle")
    page.locator(".ex-check").first.click()
    page.get_by_role("button", name="Marcar rutina completa").click()
    expect(page.get_by_role("button", name="Rutina completada hoy")).to_be_visible()
    results["interactions"]["morning_complete"] = "ok"

    # Plan day switch
    page.goto(BASE + "#/plan", wait_until="networkidle")
    page.get_by_role("button", name="Martes, sesión B").click()
    expect(page.get_by_role("heading", level=2).first).to_be_visible()
    results["interactions"]["plan_day"] = "ok"

    # SIMF tabs
    page.goto(BASE + "#/simf", wait_until="networkidle")
    for tab in ["Niveles", "Métodos", "Tests", "Microciclo", "Fases 12m"]:
        page.get_by_role("button", name=tab, exact=True).click()
        page.wait_for_timeout(150)
    results["interactions"]["simf_tabs"] = "ok"

    # Progreso shows logs
    page.goto(BASE + "#/progreso", wait_until="networkidle")
    expect(page.get_by_text("Historial de sesiones")).to_be_visible()
    expect(page.get_by_text("Rutinas matutinas")).to_be_visible()
    results["interactions"]["progreso"] = "ok"

    # Nav links (sidebar or bottom)
    for name in ["Hoy", "Plan", "SIMF", "Rutina", "Progreso"]:
        link = page.get_by_role("navigation").get_by_role("link", name=name).first
        expect(link).to_be_visible()
    results["interactions"]["nav"] = "ok"

    results["console_errors"] = console_errors
    results["page_errors"] = page_errors
    browser.close()
    return results


def main() -> int:
    all_results = []
    with sync_playwright() as p:
        all_results.append(run_viewport(p, 1280, 800, "desktop"))
        all_results.append(run_viewport(p, 390, 844, "mobile"))

    report = OUT / "report.json"
    report.write_text(json.dumps(all_results, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {report}")

    failed = False
    for r in all_results:
        if r["page_errors"]:
            failed = True
            print("PAGE ERRORS", r["viewport"], file=sys.stderr)
        for route, hits in r["overlaps"].items():
            if hits:
                failed = True
                print(f"OVERLAPS {r['viewport']} {route} count={len(hits)}", file=sys.stderr)
        for route, hits in r["overflow"].items():
            real = [
                h
                for h in hits
                if "bottom-nav" not in h.get("className", "")
                and "sidebar" not in h.get("className", "")
                and h.get("right", 0) > h.get("docW", 0) + 8
            ]
            if real:
                print(f"OVERFLOW {r['viewport']} {route} count={len(real)}", file=sys.stderr)
                failed = True
        for k, v in r["interactions"].items():
            if v != "ok":
                failed = True

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
