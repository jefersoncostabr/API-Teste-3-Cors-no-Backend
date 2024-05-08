import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const mensagens = [
  {
    id:1,
    nome:"Antonio",
    mensagem: "Próximo ensaio 15/05"
  },
  {
    id:2,
    nome:"Antonio",
    mensagem: "Teinar a coreografia"
  }
]

function buscaMensagem(id) {
  return mensagens.findIndex(msg => {
    return msg.id === Number(id);
  })
}

const corsOptions = {
  origin: 'https://consumo-api-3.netlify.app',
  optionSucessStatus: 200
}

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

app.post("/addmsg", cors(corsOptions), (req, res) => {
  mensagens.push(req.body);
  res.status(201).send("Nova msg cadastrada")
});

app.put("/mensagens/:id", (req, res) => {
  const index = buscaMensagem(req.params.id);
  mensagens[index].nome = req.body.nome;
  // res.status(200).json(mensagens[index]);
  res.status(200).json(mensagens);
});

app.delete("/del/:id", cors(corsOptions), (req, res) => {
  const index = buscaMensagem(req.params.id);
  mensagens.splice(index,1);
  res.status(200).json(mensagens);
});

export default app;
