---
title: 'OpenCohost: de una base estable a una nueva línea de producto'
description: 'La evolución de OpenCohost: Python, CustomTkinter, Ollama y Whisper como base; una migración progresiva hacia una UI nativa con Tauri y OpenCohost_UI.'
pubDate: 2026-07-06
updatedDate: 2026-07-06
locale: 'es'
author: 'Plynte Labs'
tags: ['OpenCohost', 'Tauri', 'Python', 'actualización']
order: 1
heroImage: '/news/opencohost/opencohost-2026-07-05-011715-ui.webp'
---

OpenCohost está evolucionando sin borrar lo que ya funciona. La implementación
estable sigue teniendo una base en **Python + CustomTkinter**, con **Ollama** y
**Whisper** para las capacidades locales de voz y asistencia. En paralelo, la
migración y el prototipo de una interfaz nativa con **Tauri** avanzan en
**OpenCohost_UI**.

La distinción importa: **CustomTkinter sigue siendo la referencia estable**,
mientras que Tauri es la línea de producto futuro y de migración. Este artículo
resume el progreso verificable de esa transición; no presenta la migración como
terminada ni anuncia un repositorio público que todavía no existe.

## El punto de partida: una base local que ya existe

La primera etapa se apoya en una aplicación de escritorio Python con
CustomTkinter. Ollama y Whisper forman parte de la experiencia local: el
procesamiento permanece en la máquina y la UI ofrece el punto de control para el
asistente. Esta base no desaparece por adoptar una nueva capa visual.

![Interfaz estable de OpenCohost basada en Python y CustomTkinter](/news/opencohost/opencohost-2026-06-30-144909-ui.webp)

*La implementación estable de referencia: una UI de escritorio que todavía guía la migración.*

## Un contexto histórico que ya quedó atrás

El issue **#1493 (06-jun)** sirve como contexto histórico, no como descripción del
estado actual. En ese momento el card describía OpenCohost como Python/CustomTkinter
y explicitaba que no usaba Tauri. Ese texto era correcto para aquel corte, pero
quedó superado por el prototipo y la migración posteriores.

## De los mocks a servicios reales

El issue **#2959 (05-jul)** marca un cambio de profundidad en OpenCohost_UI:
se eliminaron los mocks y quedaron **35 endpoints FastAPI reales**. También se
corrigió el bug que confundía el nombre de perfil con su UUID. La validación
reportó **354 pruebas de frontend**, **181 de backend** y build limpio.

![Pantalla de OpenCohost_UI con la capa de servicios conectada](/news/opencohost/opencohost-2026-07-05-011715-ui.webp)

*La UI deja atrás los datos simulados y se conecta con servicios que representan el flujo real.*

## Tauri como anfitrión del backend Python

El issue **#2963** documenta el siguiente paso: Tauri ya lanza y gestiona el
backend Python. El flujo incorpora un health gate, fallback de puertos y un Job
Object para evitar procesos huérfanos. El corte registró **cargo 12/12**, **vitest
362 con 6 pruebas preexistentes** y build limpio.

![Pantalla de bienvenida de la migración de OpenCohost a Tauri](/news/opencohost/opencohost-2026-07-01-222219-ui.webp)

*La bienvenida de Tauri representa la nueva envoltura nativa; el backend Python sigue siendo parte del sistema.*

![Prototipo de la interfaz principal de OpenCohost_UI en Tauri](/news/opencohost/opencohost-2026-07-03-190709-ui.webp)

*El prototipo reúne la UI nativa y el backend local bajo un mismo flujo de aplicación.*

## Estado compartido y memoria más eficiente

El issue **#2970** llevó el trabajo a la experiencia diaria: chat persistente
entre tabs, reproducción de música a nivel de aplicación y memoria lazy por fila.
La ronda dejó **382 pruebas de vitest con 6 preexistentes**, **110 pruebas de
backend de memoria** y build limpio.

![Vista de OpenCohost_UI durante la evolución del estado compartido](/news/opencohost/opencohost-2026-07-03-003226-ui.webp)

*La aplicación empieza a conservar contexto entre pestañas y a cargar memoria solo cuando cada fila la necesita.*

![Interfaz de OpenCohost_UI con el flujo de conversación persistente](/news/opencohost/opencohost-2026-07-05-030325-ui.webp)

*El chat persistente entre tabs es parte del comportamiento de producto en migración.*

## Integraciones de streaming y controles de audio

El issue **#2977** añadió un bridge/cliente OBS con retry, una agenda driver de
**4.5 s** con enqueue, seed de perfil y memorias, y controles de volumen con
ducking. La validación registró **283 pruebas de backend** y **408 de frontend
con 6 preexistentes**. Queda explícitamente la validación runtime del usuario:
las cifras de pruebas y el build no sustituyen esa comprobación en el entorno
real.

![Flujo de integración de OpenCohost_UI con OBS y audio](/news/opencohost/opencohost-2026-07-05-031402-ui.webp)

*La integración con OBS, el reintento del bridge y los controles de audio amplían el alcance del prototipo.*

![Estado de la aplicación durante la integración de servicios y agenda](/news/opencohost/opencohost-2026-07-06-194721-ui.webp)

*Una captura del trabajo posterior sobre servicios, agenda y estado de la aplicación.*

## Qué significa hoy

OpenCohost no es una migración cerrada. La lectura honesta es más útil:

- **CustomTkinter** continúa como referencia e implementación estable.
- **Tauri + OpenCohost_UI** es la línea de producto futuro y está en migración.
- Los issues recientes muestran servicios, integración y pruebas reales, pero la
  validación runtime final sigue dependiendo del usuario.
- El sitio público de OpenCohost es [opencohost.com](https://www.opencohost.com);
  no hay que inferir desde esta novedad la existencia de un repositorio público.

> Me he gastado todos mis ahorros en desarrollar este proyecto por que creo en el LOL.

![Captura de proceso conservada como evidencia, sin métricas añadidas al texto](/news/opencohost/opencohost-spend-capture.webp)

*Panel de uso y coste de una sesion de desarrollo con claude code conservado tal como fue capturado; sus cifras pertenecen a la propia imagen.*
