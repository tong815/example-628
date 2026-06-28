# Math Choice Visualizer

Math Choice Visualizer is a simple student-friendly website for practicing math multiple-choice questions. Students choose one answer, see whether it is correct, and read a short explanation.

## Files

- `index.html` sets up the page.
- `style.css` controls the visual design.
- `app.js` loads questions, checks answers, updates progress, and tracks the score.
- `questions.json` stores the question data.

## How to Open Locally

Because the website loads questions from `questions.json`, open it through a local web server.

One simple option is:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How to Edit or Add Questions

Edit `questions.json`. Each question should use this structure:

```json
{
  "id": 6,
  "question": "What is 12 + 9?",
  "options": ["19", "20", "21", "22"],
  "correctAnswer": "21",
  "explanation": "12 + 9 = 21."
}
```

Make sure `correctAnswer` exactly matches one of the choices in `options`.

## How to Push to GitHub

If this folder is already connected to the GitHub repository, use:

```powershell
git add .
git commit -m "Build math multiple choice visualizer"
git push origin main
```

If the folder is not connected yet, use:

```powershell
git init
git branch -M main
git remote add origin https://github.com/tong815/example-628.git
git add .
git commit -m "Build math multiple choice visualizer"
git push -u origin main
```
