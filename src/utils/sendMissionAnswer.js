import emailjs from "@emailjs/browser";

export async function sendMissionAnswer({ mission, answer }) {
  const templateParams = {
    mission_id: mission.id,
    mission_title: mission.title,
    mission_question: mission.question,
    answer,
    sent_at: new Date().toLocaleString(),
  };

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}
