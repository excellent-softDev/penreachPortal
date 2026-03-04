 const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://penreachsteam_db_user:Donovanlucky5%23@penreachsteam.xjgnjfs.mongodb.net/steam-lms?retryWrites=true&w=majority"
);

async function fix() {
  const db = mongoose.connection;

  const result = await db.collection("documents").updateMany(
    { subcategory: { $exists: true } },
    [
      {
        $set: { subCategory: "$subcategory" }
      },
      {
        $unset: "subcategory"
      }
    ]
  );

  console.log("Updated:", result.modifiedCount);
  mongoose.disconnect();
}

fix();
