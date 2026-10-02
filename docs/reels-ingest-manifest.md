# Mux video integration manifest

Review: 2026-10-02. Source archive `videos_reels.zip`: 200,788,024 bytes, SHA-256 `f1a8f5fa8ab6b750ec21ccffb302937605e9fc862b8b6be710ffdff0bbe98d15`; 7 entries (5 MP4, 2 JPEG). ZIP listing was checked before extraction; no traversal/absolute paths, executable or OS metadata entries were found. No video was uploaded or copied to `public/`.

## Mux asset lookup state

The five assets and their READY metadata below are reported in the user-provided task. I could not independently query Mux: this workspace has no Mux credentials/environment variables, and the dashboard opens at its login page. No Asset IDs or Playback IDs have yet been retrieved or verified. Consequently no public ID is in code, no thumbnail response or real playback is claimed, and all five projects remain drafts. Do not interpret local ZIP/source files as newly uploaded Mux assets.

| Piece | Mux title | Asset ID | Public Playback ID | Mux duration / format | Status |
|---|---|---|---|---|---|
| Short A / `short-form-001` | `SaveVid` (3:48, 720p, 9:16, 30 fps) | Pending account lookup | Pending account lookup | 03:48 / 9:16 | READY per supplied metadata; API unverified |
| Short B / `short-form-002` | `yoigo_video_no_watermark (1)` | Pending account lookup | Pending account lookup | 00:58 / 720p / 9:16 / 30 fps | READY per supplied metadata; API unverified |
| Short C / `short-form-003` | `SaveVid` (1:02, 720p, 9:16, ~29.68 fps) | Pending account lookup | Pending account lookup | 01:02 / 9:16 | READY per supplied metadata; API unverified |
| Short D / `short-form-004` | `yoigo_video_no_watermark` | Pending account lookup | Pending account lookup | 02:43 / 720p / 9:16 / 30 fps | READY per supplied metadata; API unverified |
| Audiovisual / `silver-praxis-condicion-perfecta` | `Silver Praxis - Condición Perfecta (Videoclip)` | Pending account lookup | Pending account lookup | 03:05 / 1080p / 16:9 / 30 fps | READY per supplied metadata; API unverified |

The two `SaveVid` records are distinguished by duration and frame rate, not title alone. Local source files match those duration/ratio descriptions: the 03:48 outdoor clip is `SaveVid.Net_AQOKgMidocHxLUKXRGcY7MgY6XO0p4Ppb6fW47uYFwHIVrgEJnklHIgOOdiS3apIv__2i1UALt-yR46uleNYLoziK7i4esYOQDzYv3g.mp4` (SHA-256 `767ce2c84d189cda7f83aa029c50197e6bad2e68d577aa08dfc36eb5574e30a3`); the 01:02 MyMUN/interface clip is `SaveVid.Net_AQN75Me9b7v36c8RAAPOVb_B09DRpXmY-TGQycAZhmSRtG8iNIkVRxBnIdwcX4VRw8fjxmlYuIlwr0aUpEAc316cFrLOjhzvReV2QdM.mp4` (SHA-256 `5cfc379bf7e771d612d4e05d289c5eb053f965c8bb5d50e64c6cb63babbe26af`). This is a metadata match, not independent confirmation of Mux asset identity.

## Four short-form pieces

The four local clips were each sampled at 5%, 20%, 35%, 50%, 65%, 80%, 95% and visually reviewed. The labels below distinguish observed frames from inferred editorial type. No client, organization, contract, event, date or rights are inferred from a logo or file.

### Short A — `short-form-001`

- Source: `SaveVid.Net_AQOKgMidocHxLUKXRGcY7MgY6XO0p4Ppb6fW47uYFwHIVrgEJnklHIgOOdiS3apIv__2i1UALt-yR46uleNYLoziK7i4esYOQDzYv3g.mp4`; 74,915,604 bytes; SHA-256 `767ce2c84d189cda7f83aa029c50197e6bad2e68d577aa08dfc36eb5574e30a3`.
- Local technical probe: H.264/AAC stereo, 720×1280, 9:16, 30 fps, 228.876 s (~03:49 by nearest-second rounding). Mux metadata supplied: about 03:48, 720p, 30 fps.
- **Observed:** Sofía walks and speaks to camera outdoors with a camera around her neck; street/plaza cutaways. Sofía visible/on camera: yes/yes. Interview: no. B-roll: yes. Branding/graphics/subtitles: none clearly legible in sampled frames. Event identifiable: no. Context and professional role: pending.
- Type: walk-and-talk / other (inferred). Proposed title: “Intervención a cámara en exteriores”.
- Proposed ES: “Pieza vertical en exteriores, con Sofía hablando a cámara y planos de calles y plazas.” EN: “A vertical outdoor piece with Sofía speaking to camera, intercut with street and plaza shots.” RU: “Вертикальный ролик на улице: София говорит на камеру, чередуясь с планами улиц и площадей.”
- Poster candidate: 45.8 s, Sofía in an urban setting with camera visible; face clear and no text overlay. No thumbnail URL until a public Playback ID is verified.
- Role, year, source URL, credits and rights: pending. `published:false`, `featured:false`, editorial `order:3`.

### Short B — `short-form-002`

- Source: `yoigo_video_no_watermark (1).mp4`; 14,857,732 bytes; SHA-256 `0e941c5613db70f655c1c68ccccced724bc6615e3c2e510f66aae8e3c83e0502`.
- Local technical probe: H.264/AAC stereo, 576×1024, SAR 1:1/DAR 9:16, 30 fps, 58.189 s. Mux metadata supplied: 00:58, 720p, 30 fps.
- **Observed:** Sofía holds a microphone; other people, signage, overlays and cutaways are visible. Text/branding includes `@YOIGO`, `@STARCHANNEL_ES` and “YOIGO TV / STAR”. Sofía visible/on camera: yes/yes. Interview: unclear from frames alone. Another person/B-roll/graphics: yes/yes/yes. Event identifiable: unclear. Branding does not verify an employment or client relationship.
- Type: interview/event coverage (inferred). Proposed title: “Conversación en un espacio con micrófonos”.
- Proposed ES: “Pieza vertical con Sofía, otra persona y micrófonos en un espacio con branding visible.” EN: “A vertical piece featuring Sofía, another person and microphones in a setting with visible branding.” RU: “Вертикальный ролик с Софией, другим человеком и микрофонами в пространстве с заметным брендингом.”
- Poster candidate: 55.3 s, Sofía with microphone, face clear and setting recognizable.
- Role, event/program, year, source URL, credits and rights: pending. `published:false`, `featured:true`, editorial `order:1`.

### Short C — `short-form-003`

- Source: `SaveVid.Net_AQN75Me9b7v36c8RAAPOVb_B09DRpXmY-TGQycAZhmSRtG8iNIkVRxBnIdwcX4VRw8fjxmlYuIlwr0aUpEAc316cFrLOjhzvReV2QdM.mp4`; 10,888,645 bytes; SHA-256 `5cfc379bf7e771d612d4e05d289c5eb053f965c8bb5d50e64c6cb63babbe26af`.
- Local technical probe: H.264/AAC stereo, 720×1280, 9:16, 29.68 fps, 62.669 s. Mux metadata supplied: approx. 01:02, 720p, ~29.68 fps.
- **Observed:** Sofía speaks to camera; interface/screens and graphics/text are intercut. Visible text includes MyMUN/URJCmun references. Sofía visible/on camera: yes/yes. Interview: no. Other person: not apparent in sampled frames. B-roll/screens/graphics: yes/yes. Embedded subtitles: no clear subtitle track identified visually; overlays are present. Event/affiliation: unknown.
- Type: on-camera explainer (inferred). Proposed title: “Guía visual de MyMUN”.
- Proposed ES: “Pieza vertical en la que Sofía explica MyMUN a cámara y muestra pantallas de la plataforma.” EN: “A vertical piece in which Sofía explains MyMUN on camera and shows screens from the platform.” RU: “Вертикальный ролик: София на камеру объясняет MyMUN и показывает экраны платформы.”
- Poster candidate: 59.5 s, clear close-up of Sofía; graphic remains away from her face.
- Role, event/year, organization, source URL, credits and rights: pending. `published:false`, `featured:true`, editorial `order:2`.

### Short D — `short-form-004`

- Source: `yoigo_video_no_watermark.mp4`; 21,949,521 bytes; SHA-256 `6b980eaefaa560e10bee4cdf0aabeacd40fdfcfd0450ac757023285885005574`.
- Local technical probe: H.264/AAC stereo, 576×1024, SAR 1:1/DAR 9:16, 30 fps, 163.648 s. Mux metadata supplied: 02:43, 720p, 30 fps.
- **Observed:** Sofía demonstrates a smartphone; device and packaging close-ups are intercut. Visible text includes “EL FOCO”, “A TU ARTISTA FAVORITO”, “LARGA DISTANCIA”, “VELVET GLASS”, “90W PLUS” and vivo branding on the device. Sofía visible/on camera: yes/yes. Interview: no. B-roll/graphics: yes/yes. Event identifiable: no. Whether this was commercial work or a Reporting assignment: unknown.
- Type: product/device explainer (inferred). Proposed title: “Demostración de un smartphone”.
- Proposed ES: “Pieza vertical con una demostración de un smartphone a cámara y planos de detalle del dispositivo.” EN: “A vertical piece featuring an on-camera smartphone demonstration and close-ups of the device.” RU: “Вертикальный ролик с демонстрацией смартфона на камеру и крупными планами устройства.”
- Poster candidate: 57.3 s, Sofía holding the phone; product is visible and composition differs from the other posters.
- Role, client/organization, year, source URL, credits, Reporting fit and rights: pending. `published:false`, `featured:false`, editorial `order:4`.

Proposed order: B (interaction/interview-like setting), C (direct explanation plus interface), A (outdoor walk-and-talk), D (product-led piece; least clear Reporting evidence). The first two flags are editorial priorities only, not publication approval.

## Silver Praxis — audiovisual project

- ZIP source: `Silver Praxis - Condición Perfecta (Videoclip).mp4`; 77,989,035 bytes; SHA-256 `3fe9db4e44eb70dbe32fec369d0df16f7b14db1356667097f0008a6c39fe600f`.
- Local `ffprobe`: H.264/AAC stereo, 1920×1080, 16:9, 30 fps, 185.945 s (~03:06 nearest-second). User-provided Mux metadata: READY, 03:05, 1080p, 30 fps.
- Seven representative frames were reviewed at 5–95%. **Observed:** a male performer appears in a white shirt, then in red-lit car/interior scenes, a corridor, a planted outdoor setting and a table scene. The credit frame at 176.7 s visibly reads “SHOT Y POST PRODUCCION — SOFIA CHERNIKOVA”; it also attributes creative direction/styling/lettering to Briza Sanchez and production/mix/master to Silver Praxis. The visible Sofía credit supports filming and post-production as her credited roles; no directing credit is inferred.
- Poster candidate: 65.1 s (35%); frontal performer in a clean, symmetrical corridor, no overlaid credits and distinct from the red-lit/table frames. This is a human-selected candidate, not a Mux thumbnail yet.
- Project: `silver-praxis-condicion-perfecta`; title `Silver Praxis — Condición Perfecta`; `discipline:["audiovisual"]`; format ES `Videoclip`, EN `Music video`, RU `Музыкальный клип`; 16:9; duration 03:05. Draft only: Mux IDs and poster are not connected; rights/music/talent permission remain unverified. `rights.verified:false`, `published:false`.
- Provisional audiovisual placement: after `4 MINUTOS`, before `Tras el sofá` (project order 4.5). Its staged nocturnal/urban performance imagery sits closest to the existing urban short, while remaining a distinct music video. Existing `featured` and other project orders remain untouched.

## Gates and delivery state

`MUX_ASSETS`: five existing READY assets reported by the user; not independently queried. `MUX_PLAYBACK_IDS`: all five pending authenticated account lookup. `MUX_POSTERS`: candidate times selected, image URLs pending IDs. `PUBLICATION_STATUS`: all five remain unpublished. No local media is referenced from the public site.

The previous Reporting gate required a public HTTP `sourceUrl` for every reporting project, plus role, verified rights and a renderable poster/video. It now permits a short-form project to omit `sourceUrl` only when it has its own playable Mux video, poster and aspect ratio. Coverage projects still require a public HTTP source URL. All Reporting items continue to require `roleKeys`, `rights.verified`, a poster, and renderable video/media. No rights or roles were weakened. Silver Praxis remains manually unpublished until portfolio and music/artist rights are confirmed.

`hasPublishedReporting()` is the shared content gate for the Reporting route, `/work` preview, Work rail and sitemap. With these five drafts, `/[locale]/work/reporting` remains 404 (unless other qualifying published Reporting content exists); none is added to public navigation or sitemap. Once a reel passes the gate, the existing page places Reporter Reel first if available, then short-form, then selected/more coverage. `/dev/media` displays all Mux drafts and their verified state; the production guard remains.

`PortfolioVideo` still renders the poster first and mounts only after its play button is activated. A short-form card controls a single `activeId`; the newly mounted Mux player requests autoplay after that explicit click, with `preload="none"`, `playsInline`, controls, and no autoplay on page load. Actual playback and thumbnail HTTP responses remain unverified until public Playback IDs are retrieved.

## INFORMATION NEEDED

- Mux account access: sign in to the Mux dashboard tab so the five Asset IDs and public Playback IDs can be read and verified. No password or OTP should be shared in chat.
- For each short-form: official title/context, exact credited role, year/date, original URL if public, required credits, and portfolio rights. For D, confirm it belongs in Reporting rather than commercial/personal content.
- For Silver Praxis: confirm portfolio/music/talent rights and source URL. The on-screen credit already evidences Sofía's listed filming and post-production roles; confirm the intended year and any additional credits.

No playback IDs, Asset IDs, secret values, or claims of successful playback are recorded here until checked against the Mux account/API.
