const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  const { mode } = req.query;

  try {
    const allWorkouts = workoutService.getAllWorkouts({ mode });
    res.send({ status: "OK", data: allWorkouts })
  } catch (e) {
    res
      .status(e?.status || 500)
      .send({ status: "FAILED", data: { e: e?.message || e } })
  }
};

const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { e: "Parameter ':workoutId' can not be empty" },
      })
  };

  try {
    const workout = workoutService.getOneWorkout(workoutId);
    res.send({ status: "OK", data: workout })
  } catch (e) {
    res
      .status(e?.status || 500)
      .send({ status: "FAILED", data: { e: e?.message || e } })
  }
};

const createNewWorkout = (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          e:
            "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
        },
      });
    return;
  };

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout })
  } catch (e) {
    res
      .status(e?.status || 500)
      .send({ status: "FAILED", data: { e: e?.message || e } })
  }
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { e: "Parameter ':workoutId' can not be empty" },
      });
  };

  try {
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    res.send({ status: "OK", data: updatedWorkout })
  } catch (e) {
    res
      .status(e?.status || 500)
      .send({ status: "FAILED", data: { e: e?.message || e } })
  }
};

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { e: "Parameter ':workoutId' can not be empty" },
      })
  };

  try {
    workoutService.deleteOneWorkout(workoutId);
    res.status(204).send({ status: "OK" })
  } catch (e) {
    res
      .status(e?.status || 500)
      .send({ status: "FAILED", data: { e: e?.message || e } })
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
  getRecordsForWorkout,
};