import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const mensagens = [
	{
		id: 1,
		nome: "Teste",
		mensagem: "Teste",
	}
];

function buscaMensagem(id) {
	return mensagens.findIndex((msg) => {
		return msg.id === Number(id);
	});
}

const corsOptions = {
	origin: ["https://consumo-api-3.netlify.app", "http://localhost:5500"],
	optionSucessStatus: 200,
};

app.get("/", cors(corsOptions), (req, res) => {
	res.send("Rota inicial ok!");
});

app.get("/hello/:name", cors(corsOptions), (req, res) => {
	const name = req.params.name;
	res.send(`Olá, ${name}!`);
});

app.get("/mensagens", cors(corsOptions), (req, res) => {
	// res.status(200).json("Mensagem:"+mensagens[1].mensagem);
	res.status(200).json(mensagens);
});

app.get("/mensagens/:id", cors(corsOptions), (req, res) => {
	const index = buscaMensagem(req.params.id);
	res.status(200).json(mensagens[index]);
});

// app.post("/addmsg", cors(corsOptions), (req, res) => {
//   mensagens.push(req.body);
//   res.status(201).send("Nova msg cadastrada")
// });

app.post("/addmsg", cors(corsOptions), async (req, res) => {
	// Operador ternário=> CONDIÇÃO ? CASO SIM : CASO NÃO
	let ultimoID =
		mensagens.length > 0 ? mensagens[mensagens.length - 1].id : 0;
	const novoId = ultimoID + 1;

	const newMessage = {
		id: novoId,
		...req.body, // operador de espalhamento
	};

	mensagens.push(newMessage);

	res.status(201).json({
		message: "Nova mensagem cadastrada com sucesso!",
		mensagem: newMessage,
	});
});

app.put("/mensagens/:id", (req, res) => {
	const index = buscaMensagem(req.params.id);
	mensagens[index].nome = req.body.nome;
	// res.status(200).json(mensagens[index]);
	res.status(200).json(mensagens);
});

app.delete("/del/:id", cors(corsOptions), (req, res) => {
	const index = buscaMensagem(req.params.id);
	mensagens.splice(index, 1);
	res.status(200).json(mensagens);
});

export default app;
