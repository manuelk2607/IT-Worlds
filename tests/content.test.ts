import test from "node:test";
import assert from "node:assert/strict";
import {
  topics,
  sources,
  questions,
  paths,
  levels,
} from "../src/data/content.ts";

test("all requested areas exist with three meaningful curriculum levels", () => {
  for (const id of [
    "programmiersprachen",
    "datenbanken",
    "website-bauen",
    "ki-neuronale-netze",
    "apis",
  ]) {
    const topic = topics.find((item) => item.id === id);
    assert.ok(topic, `Missing requested area ${id}`);
    assert.ok(topic.lesson, `Missing sourced introductory article for ${id}`);
  }
  assert.equal(new Set(topics.map((topic) => topic.id)).size, topics.length);
  for (const topic of topics) {
    assert.ok(topic.prerequisites.trim());
    for (const level of levels)
      assert.ok(topic.curriculum[level.id].length >= 3);
  }
});

test("all published introductory claims have traceable primary-source metadata", () => {
  for (const [id, source] of Object.entries(sources)) {
    assert.equal(new URL(source.url).protocol, "https:", id);
    assert.ok(["raw.githubusercontent.com", "www.rfc-editor.org"].includes(new URL(source.evidenceUrl).hostname), id);
    for (const field of [
      "publisher",
      "version",
      "section",
      "description",
    ] as const)
      assert.ok(source[field].trim(), `${id}: ${field}`);
    assert.match(source.reviewedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
  for (const topic of topics) {
    for (const source of topic.sources) assert.ok(sources[source]);
    for (const subarea of topic.subareas ?? []) {
      assert.ok(subarea.languages.length > 0 && subarea.description.trim());
      assert.ok(subarea.sources.length > 0);
      for (const source of subarea.sources) {
        assert.ok(sources[source]);
        assert.ok(topic.sources.includes(source));
      }
    }
    if (!topic.lesson) continue;
    assert.ok(topic.lesson.sources.length > 0, `${topic.id} lacks citations`);
    assert.ok(
      topic.lesson.goal &&
        topic.lesson.takeaway &&
        topic.lesson.paragraphs.length,
    );
    for (const source of topic.lesson.sources) assert.ok(sources[source]);
  }
});

test("quiz questions have one valid answer, feedback for every choice, and a matching article source", () => {
  assert.ok(questions.length >= 5);
  assert.equal(
    new Set(questions.map((question) => question.id)).size,
    questions.length,
  );
  for (const question of questions) {
    const topic = topics.find((item) => item.id === question.topic);
    assert.ok(topic?.lesson);
    assert.ok(
      Number.isInteger(question.answer) &&
        question.answer >= 0 &&
        question.answer < question.options.length,
    );
    assert.ok(question.options.length >= 3);
    assert.equal(
      new Set(question.options.map((option) => option.text)).size,
      question.options.length,
    );
    assert.ok(
      question.options.every(
        (option) => option.text.trim() && option.explanation.trim(),
      ),
    );
    assert.ok(
      topic.lesson.sources.includes(question.source),
      `${question.id}: answer citation must match article`,
    );
    assert.ok(sources[question.source]);
    assert.ok(levels.some((level) => level.id === question.level));
  }
});

test("available path steps lead to actual articles; planned paths cannot imply completion", () => {
  assert.equal(new Set(paths.map((path) => path.id)).size, paths.length);
  for (const path of paths) {
    assert.ok(path.prerequisites.trim() && path.steps.length);
    for (const step of path.steps) {
      const topic = topics.find((item) => item.id === step.topic);
      assert.ok(topic);
      if (step.available) assert.equal(step.title, topic.lesson?.title);
    }
  }
  const professionalPath = paths.find((path) => path.level === "profi");
  assert.ok(professionalPath);
  assert.equal(
    professionalPath.steps.filter((step) => step.available).length,
    0,
  );
});
