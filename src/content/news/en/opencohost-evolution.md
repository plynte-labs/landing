---
title: 'OpenCohost: from a stable base to a new product line'
description: 'OpenCohost is evolving from its Python, CustomTkinter, Ollama, and Whisper foundation toward a native Tauri UI through the OpenCohost_UI migration.'
pubDate: 2026-07-06
updatedDate: 2026-07-06
locale: 'en'
author: 'Plynte Labs'
tags: ['OpenCohost', 'Tauri', 'Python', 'update']
order: 1
heroImage: '/news/opencohost/opencohost-2026-07-05-011715-ui.webp'
---

OpenCohost is evolving without discarding what already works. The stable
implementation still has a **Python + CustomTkinter** foundation, with **Ollama**
and **Whisper** supporting local voice and assistant capabilities. In parallel,
a native **Tauri** interface is being migrated and prototyped in
**OpenCohost_UI**.

The distinction matters: **CustomTkinter remains the stable reference and
implementation**, while Tauri is the future product line and migration path.
This article summarizes verifiable progress; it does not present the migration
as finished or announce a public repository that does not exist.

## The starting point: an existing local foundation

The first stage is a Python desktop application built with CustomTkinter. Ollama
and Whisper are part of the local experience: processing stays on the machine,
while the UI provides the control surface for the assistant. This foundation is
not discarded by introducing a new visual layer.

![Stable OpenCohost interface built with Python and CustomTkinter](/news/opencohost/opencohost-2026-06-30-144909-ui.webp)

*The stable reference implementation: a desktop UI that still anchors the migration.*

## Historical context that is now superseded

Issue **#1493 (June 6)** is historical context, not a description of the current
state. At that point, the card described OpenCohost as Python/CustomTkinter and
explicitly said it did not use Tauri. That wording was accurate for that cut,
but it was superseded by the later prototype and migration work.

## From mocks to real services

Issue **#2959 (July 5)** marks a deeper step in OpenCohost_UI: mocks were removed
and **35 real FastAPI endpoints** were in place. A bug that confused a profile
name with its UUID was also fixed. The validation reported **354 frontend tests**,
**181 backend tests**, and a clean build.

![OpenCohost_UI screen with the connected service layer](/news/opencohost/opencohost-2026-07-05-011715-ui.webp)

*The UI moves beyond simulated data and connects to services that represent the real flow.*

## Tauri as the Python backend host

Issue **#2963** documents the next step: Tauri now launches and manages the
Python backend. The flow includes a health gate, port fallback, and a Job Object
to prevent orphaned processes. That cut recorded **cargo 12/12**, **vitest 362
with 6 pre-existing tests**, and a clean build.

![OpenCohost Tauri migration welcome screen](/news/opencohost/opencohost-2026-07-01-222219-ui.webp)

*Tauri's welcome screen represents the new native shell; the Python backend remains part of the system.*

![OpenCohost_UI main interface prototype in Tauri](/news/opencohost/opencohost-2026-07-03-190709-ui.webp)

*The prototype brings the native UI and local backend into one application flow.*

## Shared state and more efficient memory

Issue **#2970** moved the work into everyday product behavior: persistent chat
across tabs, app-level music playback, and lazy memory per row. The round left
**382 vitest tests with 6 pre-existing tests**, **110 backend memory tests**, and
a clean build.

![OpenCohost_UI view during shared-state development](/news/opencohost/opencohost-2026-07-03-003226-ui.webp)

*The application starts preserving context across tabs and loading memory only when each row needs it.*

![OpenCohost_UI conversation flow with persistent chat](/news/opencohost/opencohost-2026-07-05-030325-ui.webp)

*Persistent cross-tab chat is part of the product behavior under migration.*

## Streaming integrations and audio controls

Issue **#2977** added an OBS bridge/client with retry, a **4.5-second** agenda
driver with enqueue, profile and memory seeding, and volume controls with
ducking. Validation recorded **283 backend tests** and **408 frontend tests with
6 pre-existing tests**. User runtime validation remains explicitly outstanding:
test counts and a clean build do not replace a check in the real environment.

![OpenCohost_UI OBS and audio integration flow](/news/opencohost/opencohost-2026-07-05-031402-ui.webp)

*OBS integration, bridge retries, and audio controls expand the migration's product surface.*

![Application state during service and scheduling integration](/news/opencohost/opencohost-2026-07-06-194721-ui.webp)

*A later work-in-progress capture of services, scheduling, and application state.*

## What this means today

OpenCohost is not a closed migration. The honest reading is more useful:

- **CustomTkinter** continues as the stable reference and implementation.
- **Tauri + OpenCohost_UI** is the future product line and remains in migration.
- Recent issues show real services, integrations, and tests, but final runtime
  validation still depends on the user.
- The public OpenCohost site is [opencohost.com](https://www.opencohost.com);
  this update should not be read as evidence of a public repository.

> I had been working on this project and I used all of my savings to develop because i think is worth it LOL.

![Development-process usage and cost panel preserved as work evidence](/news/opencohost/opencohost-spend-capture.webp)

*Usage and cost panel on a sesion of development using claude code preserved as captured; its figures belong to the image itself.*
