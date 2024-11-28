export const event = {
      name: "ready",
      once: true,
      async execute(client) {
            const commnadNumber = Array.from(client[0].commands).length
            console.log(`Logged In ${client[0].user.tag}. with ${commnadNumber} commnads`)
      }
}