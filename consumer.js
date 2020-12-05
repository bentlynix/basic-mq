const amqp = require("amqplib");
async function connect() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");
		const channel = await connection.createChannel();
		const result = await channel.assertQueue("jobs");

		channel.consume("jobs", (msg) => {
			const input = JSON.parse(msg.content.toString());
			console.log(`Received job with input ${input.number}`);
			if (input.number == 19) {
				channel.ack(msg);
			}
		});

		console.log("Waiting for messages");
	} catch (err) {
		console.log(err);
	}
}

connect();
