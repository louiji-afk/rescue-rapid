<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Rescue Rapid's clinical palette and motion in `src/styles.css` semantic tokens; this keeps user and admin dashboards visually consistent without altering emergency state logic.
- Keep operator attention and medical triage tags on the incident in the shared rescue store; this prevents one incident's reassurance or tags leaking into another.
- Keep the rescue React context identity stable across development module refreshes; consumers and provider must reference the same context even when refreshed separately.
- Keep the hospital white-and-soft-blue palette (white bg, #F0F9FF surfaces, crimson SOS) as the sole theme in `src/styles.css`; no dark mode or theme switcher.
- Keep VPN guidance as a static amber badge rather than inferring VPN use from browser timezone; timezone is not a reliable VPN signal.
- Keep the simulated ping in a shared presentation component and incoming-card motion in CSS; neither should modify rescue state or imply measured connectivity.
- Anonymous patients write/read only via token-checked server functions (src/lib/patient-sync.functions.ts); staff read via RLS + realtime — patients never sign in, so RLS cannot scope them.
