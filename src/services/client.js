import axios from "axios";

class Client {
  // static BASE_URL = "http://localhost:3334/api/v1";
  static BASE_URL = "https://yatinbackoffice.herokuapp.com/";
  static instance = axios.create({ baseURL: this.BASE_URL, timeout: 1000 });

  static doGet = async (url, params = null, data = null) => {
    try {
      const response = await this.instance.get(url, { params: params }, data);
      // console.log(`Get-Response - ${JSON.stringify(response)}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw Error(response.statusText);
      }
    } catch (error) {
      throw error;
    }
  };

  static doPost = async (url, data) => {
    try {
      const response = await this.instance.post(url, data);
      // console.log(`Post-Response - ${JSON.stringify(response)}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw Error(response.statusText);
      }
    } catch (error) {
      throw error;
    }
  };

  static doDelete = async (url, params) => {
    try {
      const response = await this.instance.delete(url, { params: params });
      // console.log(`Delete-Response - ${JSON.stringify(response)}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw Error(response.statusText);
      }
    } catch (error) {
      throw error;
    }
  };
}

export default Client;
