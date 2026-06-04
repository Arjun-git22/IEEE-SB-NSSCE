import { Event } from '../types';

export const pesEvents: Event[] = [
  {
    id: "pes-e1",
    slug: "pes-meetup",
    title: "Power & Energy Meetup",
    description: "Join us for an exciting day of learning, networking, and hands-on workshops with industry leaders in the field. This event brings together students and professionals to share ideas and innovate.",
    date: "2026-09-10T10:00:00Z",
    endDate: "2026-09-10T16:00:00Z",
    venue: "NSSCE Main Auditorium",
    societyId: "pes", // Fallback for execom
    status: "upcoming",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    tags: ["Networking", "Workshop", "Tech"],
    registrationUrl: "https://forms.gle/dummy-link-xyz",
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop"
    ],
    speakers: [
      {
        name: "Jane Doe",
        designation: "Senior Engineer & Industry Expert",
        bio: "Jane is an industry veteran with over a decade of experience and a passion for teaching and open-source contribution.",
        photo: "https://sb-dataset.vercel.app/team/default.png"
      },
      {
        name: "John Smith",
        designation: "Technical Lead",
        bio: "John leads the architecture team and specializes in scalable systems design and robust software engineering practices.",
        photo: "https://sb-dataset.vercel.app/team/default.png"
      }
    ],
    agenda: [
      { time: "10:00 AM", title: "Inauguration & Keynote", description: "Opening remarks and keynote speech." },
      { time: "11:00 AM", title: "Technical Session 1", description: "Deep dive into the latest industry trends." },
      { time: "01:00 PM", title: "Lunch Break" },
      { time: "02:00 PM", title: "Hands-on Workshop", description: "Interactive session building a real-world project." },
      { time: "04:00 PM", title: "Closing Ceremony & Networking" }
    ],
  }
];
