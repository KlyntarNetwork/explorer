export interface AnnouncementItem {
  id: string;
  title: string;
  date?: string;
  href?: string;
}

export const announcements: AnnouncementItem[] = [
  {
    id: 'api-key-mandatory-2025-07-28',
    title: 'Follow-up Announcement on the Mandatory Requirement of API Key for All Requests',
    date: '2025-07-28',
    href: '#',
  },
  {
    id: 'shards-multi-node',
    title: 'Shards are now selectable in the header (each shard can route to its own node URL)',
    href: '#',
  },
];



