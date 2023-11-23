const MONGODB_URI =
  "mongodb+srv://vanchihieu3:KPPnLY9EGEbIcYgk@cluster0-chihieudev.unhzc4t.mongodb.net/?retryWrites=true&w=majority";

const DATABASE_NAME = "trello-chihieudev";

import { MongoClient, ServerApiVersion } from "mongodb";

let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  try {
    // gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
    await mongoClientInstance.connect();

    // Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại cho biến trelloDatabaseInstance
    trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME);
    console.log("Connected successfully to server");
  } catch (error) {
    throw new Error("Connect failed", error);
  }
};

// Luu y: Ham nay phai duoc goi sau khi da goi ham CONNECT_DB
export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Database first!");
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
