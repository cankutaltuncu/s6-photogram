import fs from "fs/promises";
import path from "path";

async function sendTestResults(results) {
  try {
    const response = await fetch(
      "https://edugen-backend-487d2168bc6c.herokuapp.com/projectLog/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(results),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to send test results:", error);
  }
}

async function getUserId() {
  try {
    const userId = (await fs.readFile("student_id.txt", "utf-8")).trim();

    // Varsayılan değerleri kontrol et
    const defaultValues = ["123456"];

    if (!userId) {
      throw new Error("Lütfen öğrenci numaranı student_id.txt dosyasına ekle.");
    }

    if (defaultValues.includes(userId)) {
      throw new Error(
        "Öğrenci numaranı eklemeyi unutmuşsun gibi görünüyor. öğrenci numaranı student_id.txt dosyasına ekle.",
      );
    }

    return userId;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(
        "student_id.txt dosyası bulunamadı. Bu dosyayı yarat ve içine Kaizu'da belirtilen öğrenci numaranı yaz.",
      );
    }
    throw error;
  }
}

function collectTests(tasks, all = []) {
  for (const task of tasks) {
    if (task.type === "test") {
      all.push(task);
    } else if (task.type === "suite" && task.tasks) {
      collectTests(task.tasks, all);
    }
  }
  return all;
}

export default class Reporter {
  fileList = [
    "src/App.jsx",
    "src/components/Post.jsx",
    "src/components/PostComment.jsx",
  ];

  async onFinished(files) {
    let passed = 0;
    let failed = 0;
    let total = 0;
    const testResults = [];

    for (const file of files) {
      const tests = collectTests(file.tasks);
      for (const task of tests) {
        if (!task.result) continue;
        total++;
        if (task.result.state === "pass") passed++;
        else if (task.result.state === "fail") failed++;

        testResults.push({
          name: task.name,
          state: task.result?.state ?? "unknown",
        });
      }
    }

    const summary = `${passed} passed, ${failed} failed out of ${total}`;
    const report = {
      stats: summary,
      tests: testResults,
    };

    await fs.writeFile("resultz.json", JSON.stringify(report, null, 2));

    const codefiles = {
      "resultz.json": report,
    };

    for (const relPath of this.fileList) {
      try {
        const absPath = path.resolve(process.cwd(), relPath);
        const content = await fs.readFile(absPath, "utf-8");
        codefiles[relPath] = content;
      } catch (err) {
        codefiles[relPath] = `Error reading file: ${err.message}`;
      }
    }

    const userId = await getUserId();

    const payload = {
      is_auto: true,
      project_id: 599,
      user_files: codefiles,
      user_id: Number(userId),
      user_score: total > 0 ? Math.round((passed / total) * 100) : -1,
    };

    await sendTestResults(payload);
  }
}
