import React from 'react';
import './App.css';
import Input from './component/Input'
import HEXInput from './component/HEXInput'

interface RGBInputState {
  rgb: number[],
  hsv: number[],
  hex: string,
  rawHex:string,
  
}

class RgbInput extends React.Component<{}, RGBInputState>{
  constructor(props: {}) {
    super(props);

    let randomColor=["#5674c9","#25c9ab","#9969c9","#e6ee9c"];
    let randomRgb=[[153,105,201],[37,201,171],[153,105,201],[230,238,156]];
    let randomHsv=[[270,0.4776,0.7882],[168.2209,0.815,0.7843],[270,0.4776,0.7882],[65.8537,0.3445,0.9333]];
    let index = Math.floor((Math.random()*randomColor.length));

    this.state = {
      rgb: randomRgb[index],
      hsv: randomHsv[index],
      hex: randomColor[index], //绘图色
      rawHex:randomColor[index]//原始值
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRgbConverse = this.handleRgbConverse.bind(this);
    this.handleHsvConverse = this.handleHsvConverse.bind(this);
    this.func = this.func.bind(this);
    this.handleHexInputChange = this.handleHexInputChange.bind(this);
  }

  handleInputChange(value: string, type: "rgb" | "hsv", index: number) {
    if(type==="rgb"){
      this.state[type][index] = parseInt(value);
      this.setState(this.state);
      this.handleRgbConverse();
    }else{
      //this.state[type][index] = parseInt(value);
      this.state[type][index] = parseFloat(value);
      this.setState(this.state);
      this.handleHsvConverse();
    }
  }

  func(num: number) {
    if(!num){
      return '00'
    }
    let dic: { [key: number]: string } = {
      10: 'A',
      11: 'B',
      12: 'C',
      13: 'D',
      14: 'E',
      15: 'F',
    }
    let str = ""
    let sh = Math.floor(num / 16);
    num = num - sh * 16;
    let shTmp = "";
    let numTmp = ""
    if (sh > 9) {
      shTmp = dic[sh];
    } else {
      shTmp = sh + ""
    }
    if (num > 9) {
      numTmp = dic[num];
    } else {
      numTmp = num + ""
    }
    str += shTmp;
    str += numTmp;
    //console.log(str)
    return str;
  }

  handleRgbConverse(flag="rgb") {
    let [r, g, b] = this.state.rgb;

    if(r<0||!r) r=0;
    else if(r>255) r=255;
    if(g<0||!g) g=0;
    else if(g>255) g=255;
    if(b<0||!b) b=0;
    else if(b>255) b=255;    

    let str = "#"
    str += this.func(r) + this.func(g) + this.func(b);

    let h = 0; let s = 0; let v = 0;
    r = r / 255;
    g /= 255;
    b /= 255;

    let max_rgb = Math.max(r, g, b);
    let min_rgb = Math.min(r, g, b);
    let c = max_rgb - min_rgb;
    v = max_rgb;
    if (max_rgb === 0) {
      s = 0;
    } else {
      s = c / max_rgb;
    }
    if (c === 0) {
      h = 0;
    } else {
      if (r === max_rgb) {
        h = (g - b) / c * 60;
      }
      if (g === max_rgb) {
        h = ((b - r) / c + 2) * 60;
      }
      if (b === max_rgb) {
        h = ((r - g) / c + 4) * 60;
      }
    }
    if (h < 0) {
      h += 360;
    }
    let rawStr="";
    if(flag==="hex"){
      rawStr=this.state.rawHex;
    }else{
      rawStr=str;
    }
    this.setState({
      hsv: [
        parseFloat(h.toFixed(4)),
        parseFloat(s.toFixed(4)),
        parseFloat(v.toFixed(4))
      ]
      ,
      hex: str,
      rawHex:rawStr
    })
  }

  handleHsvConverse() {
    let [h, s, v] = this.state.hsv;

    if(h<0||!h) h=0;
    else if(h>360) h=360;
    if(s<0||!s) s=0;
    else if(s>1) s=1;
    if(v<0||!v) v=0;
    else if(v>1) v=1;

    let r = 0, g = 0, b = 0;
    let i = Math.floor((h / 60) % 6);
    let f = h / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0:
        r = v; g = t; b = p;
        break;
      case 1:
        r = q; g = v; b = p;
        break;
      case 2:
        r = p; g = v; b = t;
        break;
      case 3:
        r = p; g = q; b = v;
        break;
      case 4:
        r = t; g = p; b = v;
        break;
      case 5:
        r = v; g = p; b = q;
        break;
      default:
        break;
    }
    r = Math.floor(r * 255.0)
    g = Math.floor(g * 255.0)
    b = Math.floor(b * 255.0)
    let str = "#"
    str += this.func(r) + this.func(g) + this.func(b);
    this.setState({
      rgb: [
        r,
        g,
        b
      ],
      hex: str,
      rawHex:str
    })
  }

  async handleHexInputChange(value:string){
    let rawHex=value;
    this.setState({rawHex});
    let reg=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    rawHex=rawHex.toLowerCase();
    if(rawHex && reg.test(rawHex)){
      await this.setState({hex:rawHex});
      let sixColor="";
      if(rawHex.length===4){
        sixColor+="#";
        for(let i=1;i<4;i++){
          sixColor+=rawHex[i];
          sixColor+=rawHex[i];
        }
      }else{
        sixColor=rawHex;
      }
      //处理六位的颜色值
      for(let i=1,j=0;i<7;i+=2,j++){
        this.state['rgb'][j]=parseInt("0x"+sixColor.slice(i,i+2));
      }
      await this.setState(this.state);
      this.handleRgbConverse("hex");
    }
  }
  // handleHexInputChange(value:string){
  //   let rawHex=value;
  //   this.setState({rawHex})
  //   console.log(rawHex)
  //   let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  //   rawHex = rawHex.toLowerCase();
  //   if (rawHex && reg.test(rawHex)) {
  //     this.setState({hex:rawHex},()=>{
  //       let sixColor = "";
  //       if (rawHex.length === 4) {
  //         sixColor+="#"
  //         for (let i=1; i<4; i++) {
  //           sixColor+=rawHex[i];
  //           sixColor+=rawHex[i];
  //         }
  //       }else{
  //         sixColor=rawHex;
  //       }

  //       //处理六位的颜色值
  //       for (let i=1,j=0; i<7; i+=2,j++) {
  //         this.state['rgb'][j]=parseInt("0x"+sixColor.slice(i,i+2));
  //       }
        
  //       this.setState(this.state,()=>{
  //         console.log(this.state.rgb)
  //         this.handleRgbConverse();
  //         console.log(this.state.hsv)
  //       });
  //     })
  //   }
  // }

  render() {
    let [r, g, b] = this.state.rgb;
    let [h, s, v] = this.state.hsv;
    let str = this.state.hex;
    let rawHex=this.state.rawHex
    return (
      <div className="color" style={{ backgroundColor: str }}>

      <div className="bg" style={{backgroundColor:"white"}}>
        <h4>RGB</h4>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Input value={r} label={'r:[0,255]'} change={(e) => { this.handleInputChange(e.target.value, "rgb", 0) }}></Input>
          <Input value={g} label={'g:[0,255]'} change={(e) => { this.handleInputChange(e.target.value, "rgb", 1) }}></Input>
          <Input value={b} label={'b:[0,255]'} change={(e) => { this.handleInputChange(e.target.value, "rgb", 2) }}></Input>
        </div>

        <h4>HSV</h4>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Input value={h} label={'h:[0,360]'} change={(e) => { this.handleInputChange(e.target.value, "hsv", 0) }}></Input>
          <Input value={s} label={'s:[0,1]'} change={(e) => { this.handleInputChange(e.target.value, "hsv", 1) }}></Input>
          <Input value={v} label={'v:[0,1]'} change={(e) => { this.handleInputChange(e.target.value, "hsv", 2) }}></Input>
        </div>

        <h4>HEX</h4>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <HEXInput value={rawHex} change={(e) => {this.handleHexInputChange(e.target.value)}} ></HEXInput>
        </div>

        </div>
      </div>

    );
  }
}

export default RgbInput;
