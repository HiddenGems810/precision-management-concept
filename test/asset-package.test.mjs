import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..', 'public', 'assets', 'exports');

test('ships the promised asset exports', () => {
  const expected = [
    'brand-guidelines/precision-brand-guidelines-preview.pdf',
    'logo-system/primary-logo.svg',
    'logo-system/horizontal-logo.svg',
    'logo-system/monogram.svg',
    'logo-system/one-color-logo.svg',
    'logo-system/reversed-logo.svg',
    'logo-system/precision-management-official-logo.svg',
    'owner-acquisition/owner-acquisition-one-sheet.pdf',
    'resident-communication/resident-maintenance-notice.pdf',
    'print-collateral/print-collateral-preview.pdf',
    'website-ui/website-ui-concept.pdf',
    'previews/brand-guidelines-preview.webp',
    'previews/owner-one-sheet-preview.webp',
    'previews/resident-notice-preview.webp',
    'previews/business-card-preview.webp',
    'previews/letterhead-preview.webp',
    'previews/linkedin-post-preview.webp',
    'previews/email-header-preview.webp',
    'previews/website-hero-preview.webp',
    'previews/mobile-ui-preview.webp',
  ];

  for (const file of expected) assert.ok(existsSync(path.join(root, file)), `missing ${file}`);
});

test('keeps browser-print masters as the only PDF source of truth', () => {
  const project = path.resolve(import.meta.dirname, '..');
  assert.ok(existsSync(path.join(project, 'app', 'print', '[asset]', 'page.tsx')), 'missing editable browser-print masters');
  assert.ok(existsSync(path.join(project, 'scripts', 'export-pdfs.ps1')), 'missing deterministic PDF export script');
});
