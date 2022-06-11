exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      res.status(404).json({
        status: "fail",
        message: "No document found with that id",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "OK",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    next(error);
  }
};

exports.addOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      doc,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    next(err);
  }
};

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    console.log(req.params.id, req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      res.status(404).send("No document found with that id");
      return;
    }

    res.status(200).json({
      status: "success",
      doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    next(error);
  }
};

exports.getOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id).lean();
    if (!doc) {
      res.status(404).send("No document found with that id");
      return;
    }
    res.status(200).json({
      status: "success",
      doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    next(error);
  }
};

exports.getAll = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.find();

    if (!doc) {
      res.status(404).send("No document found");
      return;
    }

    res.status(200).json({
      status: "success",
      doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    next(error);
  }
};
