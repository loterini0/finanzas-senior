const { execFile } = require("child_process");
const path = require("path");

const pythonPath = "python"; // o "python3" según tu sistema
const scriptPath = path.resolve(__dirname, "../../scripts/gpt4all_runner.py");

const askAssistant = (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ message: "Pregunta requerida" });

  execFile(pythonPath, [scriptPath, question], (error, stdout, stderr) => {
    if (error) {
      console.error("Error ejecutando GPT4All:", error);
      return res.status(500).json({ message: "Error al procesar la solicitud con IA" });
    }
    if (stderr) console.error(stderr);

    res.json({ question, answer: stdout.trim() });
  });
};

module.exports = { askAssistant };
