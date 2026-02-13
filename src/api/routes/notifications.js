import { Router } from 'express';
const router = Router();

// STUB — endpoints to be implemented by owning chief
// See docs/TEAM-PLAYBOOK.md for ownership

router.get('/', (req, res) => {
  res.json({ message: `notifications routes — not yet implemented`, status: 'stub' });
});

export default router;
