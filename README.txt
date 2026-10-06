MELINDA PORTFOLIO — PROJECT VAULT + COURSE ARCHIVE

OPEN THE WEBSITE
Extract the ZIP, then open index.html in your browser. Keep all files and the assets folder together. No installation or server is required.

PAGES
index.html — Introduction, selected work, work timeline, animated relevant courses, Off the clock slideshow, and contact.
resume.html — Education, skills, experience, honors, and leadership. Use Print résumé to print it or select Save as PDF in your browser’s print dialog.

EDIT THE PROJECTS
The selected-work section is a classified project vault. Click Open vault to slide the access panel aside and reveal three paper dossiers with TOP SECRET stamps. The opening takes 850ms; reduced-motion preferences open it immediately. Close vault seals the archive again. This is a visual interaction, not authentication or encryption, and no credentials are requested.
Click a dossier to open its notes in a macOS-style popup with a paper document interior. Red closes it, yellow minimizes it to a restore button below the vault, and green expands it. Drag the title bar to move it within the screen. Escape closes it. Keyboard focus stays inside an open popup and returns to its file when closed.
In index.html, edit the three finder-file links and the project-record articles below the vault. Each link's data-open-project value matches the record ID after project-. Keep these keys matched. Edit the file title/type and corresponding record heading, description, and notes. Case numbers and classification labels are design accents; all original project text is retained. Update the three-dossier count in markup and site.js when adding files.
The project content appears directly below the archive when JavaScript or native dialog support is unavailable. All notes remain available for printing. Project links with #project-checkout, #project-plant-care, or #project-collaboration open a specific dossier and bypass the vault animation. The existing intro, timeline, resume, and slideshow are unchanged.
Vault appearance is in the Project vault block of styles.css. The opening interaction and popup controls are in startFinder in site.js. No installation or server is needed.

EDIT THE COURSES
The Knowledge archive / Relevant courses section appears after the learning section and is linked from Courses in the main navigation. Four coursework subjects are included: Computer Networks, Human-Computer Interaction, Linear Algebra, and Multivariate Calculus. No completion dates, grades, credits, or planned-course claims are added.
Edit the four <li class="course-file"> entries in index.html under course-group. Change the file number, subject, title, topic description, and footer label. The script automatically creates one visual copy for the seamless loop; that copy is hidden from assistive technology and printing.
The track scrolls left continuously in a 46-second linear loop. Hover or keyboard focus freezes it in place. Pause scroll switches to a native scrollable row so visitors can scroll or swipe manually; Resume scroll restarts it near the same course. Reduced-motion settings automatically use the manual row. Without JavaScript, there is one complete scrollable list. Motion pauses while the section is offscreen or the browser tab is hidden.
To change speed, edit --course-loop-duration in the course-ticker rule in styles.css. Keep course-group's right padding equal to its gap so the loop joins cleanly. All cards use the same width, which switches from 300px to 275px on small screens. The course ticker works offline in both the standalone HTML and the source pages.

EDIT THE WORK TIMELINE
The layout matches the alternating timeline in the supplied Aahana 2D reference: a central rail, entries on opposite sides, date above organization and role, and a scroll-driven line. On screens 700px wide or smaller, all entries sit to the right of a left-side rail.
In index.html, find timeline-track and <ol class="work-timeline">. Each <li class="timeline-entry timeline-left"> or timeline-right is one role. Copy an entry and alternate the side classes. Edit timeline-date, timeline-company, timeline-job, and timeline-summary to change its information.
The cyan rail fills toward the middle of the viewport with a smooth 140ms transition. Text gently fades in and moves sideways by 14px as a role reaches the middle of the screen. The current node brightens as you pass it. Content stays visible after its first reveal. Fast scrolling also reveals roles already passed. The layout itself does not move, so the nodes remain aligned to the rail.
Reduced-motion preferences, printing, unsupported browsers, or disabled JavaScript show the complete timeline immediately. The effect works in the standalone download and the separate source pages.
Motion settings are in the Alternating timeline rules in styles.css and the startTimeline block in site.js.

EDIT THE RESUME
Edit the education, skills, and job entries in resume.html. FGCombo currently lists a start date because no end date was confirmed. Add or update your roles and dates as needed.

EDIT THE SLIDESHOW
Each <figure class="slide"> contains an image and a <figcaption class="slide-description"> with a title and description. These personal-interest captions change along with the slideshow images. Edit them directly in index.html.
Replace the image files in assets using the same filenames, or change the image src values in index.html. Update alt descriptions to match your images.
Previous/Next, the dots, left/right keyboard keys, and horizontal swipes navigate the slides. Play advances every five seconds. Autoplay is off at first.

STYLES AND CONTROLS
styles.css contains the dark navy, cyan, and violet cyber theme, system fonts, monospace labels, responsive panels, and white print styles. The screen theme is in the Cyber portfolio theme block.
slideshow.js contains the slideshow controls.
site.js handles the résumé print button, timeline reveal, animated access intro, the project vault with dossier windows, and the course ticker.

SINGLE-FILE COPY
The separate melinda-project-vault-courses.html download contains both pages, images, styling, and scripts in one file. Use it for easy viewing; edit the ZIP’s separate files for easier customization.


OPENING SCREEN
A dark navy access terminal with electric cyan and violet accents slowly types Melinda Chen into the Agent ID field. Each matching keyboard key lights up. A fingerprint scan and loading bar follow; Access granted appears, then the panels slide open to reveal the website. The complete sequence takes about 9.3 seconds. Skip intro or Escape enters sooner.
The terminal is an automatic visual animation. It does not ask for, capture, or check a fingerprint, username, password, or any other personal data.
The intro plays on a fresh homepage load with no fragment (or #home). Direct links to the work, timeline, Off the clock, or resume skip it. Reduced-motion preferences bypass it. Without JavaScript or native dialog support, the website opens normally. A thirteen-second safety timeout prevents the intro from remaining on screen, and switching tabs dismisses it.
To adjust the name or typing speed, edit name and keyDelay in site.js. scanDuration controls the loading/scan phase. entryDuration matches the 900ms panel transitions in styles.css. The matching scan duration is set automatically in CSS by site.js.
The portfolio, classified project dossiers, work timeline, learning section, slideshow, contact area, and resume share the cyber theme. All supplied text and controls are preserved. The ZIP includes the three collage images. No ocean artwork is needed by this version.
Nothing has been hosted or published.

ICON CREDITS
Fingerprint-pattern, lock-keyhole, check, shopping-bag, leaf, network, layout-grid, panels-top-left, x, minus, maximize and vault icons: Lucide Icons, bundled inline for offline use. https://lucide.dev/

ISC License

Copyright (c) 2026 Lucide Icons and Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

---

The following Lucide icons are derived from the Feather project:

airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out

The MIT License (MIT) (for the icons listed above)

Copyright (c) 2013-present Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
