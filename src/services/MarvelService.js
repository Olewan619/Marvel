import md5 from "crypto-js/md5";

class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiPublicKey = "925ef6cf7ee458bd477dbe16ae3d2cdd";
  _apiPrivateKey = "0c834db343d44a70e24b4dbeb1ef31e141f3354d";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  generateAuthParams = () => {
    const ts = new Date().getTime();
    const hash = md5(ts + this._apiPrivateKey + this._apiPublicKey).toString();
    return `ts=${ts}&apikey=${this._apiPublicKey}&hash=${hash}`;
  };

  getAllCharacters = () => {
    const authParams = this.generateAuthParams();
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=200&${authParams}`
    );
  };

  getCharacter = (id) => {
    const authParams = this.generateAuthParams();
    return this.getResource(`${this._apiBase}characters/${id}?${authParams}`);
  };
}

export default MarvelService;
