// SAMPLE presentation data for the demo. Real event data comes from the API. In Version 2 these fields move to the database.
const EVENT_VISUALS = {
  '550e8400-e29b-41d4-a716-446655440000': {
    tag: 'AI',
    date: 'Thu, Nov 20 \u2022 6:30 PM - 9:00 PM',
    venue: 'Innovation Hub, Room 304',
    image: '/events/ai-build-night.jpg',
    description: 'Collaborative sprint on LLM agents and multi-modal models. Bring your laptop and prototype together.',
  },
  '550e8400-e29b-41d4-a716-446655440001': {
    tag: 'Robotics',
    date: 'Fri, Nov 21 \u2022 3:00 PM - 7:00 PM',
    venue: 'Engineering Hall B, Lab 12',
    image: '/events/robotics-sprint.jpg',
    description: 'Autonomous micro-controller firmware assembly & obstacle course trial run.',  },
  '550e8400-e29b-41d4-a716-446655440002': {
    tag: 'Open Source',
    date: 'Sat, Nov 22 \u2022 10:00 AM - 4:00 PM',
    venue: 'Campus Commons & Virtual',
    image: '/events/open-source-jam.jpg',
    description: 'Contribute to verified university open-source repositories, make first PRs, and receive mentored code reviews.',
  },
  '550e8400-e29b-41d4-a716-446655440099': {
    tag: 'AI',
    date: 'Sun, Nov 23 \u2022 5:00 PM - 6:00 PM',
    venue: 'Innovation Hub, Room 101',
    image: '/events/ai-build-night.jpg',
    description: 'Collaborative sprint on LLM agents and multi-modal models. Bring your laptop and prototype together.',
  },
}

const FALLBACK_VISUALS = {
  tag: 'Event',
  date: '',
  venue: '',
  image: null,
  description: '',
}

export function getEventVisuals(id) {
  return EVENT_VISUALS[id] || FALLBACK_VISUALS
}