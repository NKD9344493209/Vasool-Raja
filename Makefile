.PHONY: setup run test samples shots docker
setup: ; pip install -r requirements-dev.txt && python scripts/make_samples.py && python scripts/make_passbook_image.py
run: ; uvicorn api.main:app --reload --port 8000
test: ; python -m pytest -q
samples: ; python scripts/make_samples.py && python scripts/make_passbook_image.py
shots: ; python scripts/ui_walkthrough.py http://localhost:8000
docker: ; docker compose up --build
