let playerModel;
let monsterModel;
let aboutModel;
let nocolor="#0000"

// enemy data
let edata={
  m:unpackModelMessage(":;:HVDOhgkaskooniqikklinf*;;:AETMQOQL*<;:AGOMOKML*=;:FAHJEOIP*>;:FAHJEOIP"),
  r:unpackRigMessage("GQ1im^in_jx`kxaAE0AG0FA0FA0"),
  a:unpackAnimation("*run*F^]]hQ*\\@*[@*[@*R@*j@*eat*F]]]iS*W<\\@*X<]@TB*c<]@eB*Q@*j@*fall*PbZ^QP*_C*YC*ZC*QC*TC"),
  c:["#eccf",nocolor]
}

let abdata={
  m:unpackModelMessage(":;:GRKPCI*;;:LAJEJIHI*<;:LAJEJIHI*=;:AOLK*>;:BBMI*?;:OHBDechdghidkeji*@;:BEOI"),
  r:unpackRigMessage("GR1ku^iu_fl`LA0LA0AO0onaMI0eebeecBD0BD0"),
  a:unpackAnimation("*still*PVcgd]WX*[D*]D*dD*YD*eD*QD*YD*talk*FZadcZXX*XC*aC*fC*a>c@eC*]>Z@\\C*R>W@SC*\\>W@[C"),
  c:["#ada",nocolor]
}

let s1data = {
  m:unpackModelMessage(":;:SDH<>CHKSDSPHX>P>JHRSKNNNGC?M@CGCT>P>C*;;:HDHL*<;:KJFE*<;<GDibbhhi*<;<LItmosmn"),
  r:unpackRigMessage("HL0HE1ki]kg_HH0"),
  a:unpackAnimation("*ya*J]]]*[D**yB*"),
  c:["#dcd",nocolor,"rgba(174,44,0,1.0)"]
}

let pdata = {
  m:unpackModelMessage(":;ŦBALDnjijlfhifhhe*;;<FGJH*<;<FHJI*:;>GJfoblfe*=;>GOFJGB*>;>EFH@*?;ĂEFGM*@;>EFH@*A;ĂEFGM*B;ĂHEJLIOMO*C;ĂHEJLIOMO*D;ŦFNJLHNHKNS"),
  r:unpackRigMessage("DH0ij^ik_FG0FH0FJ1kc]geamfchpekpfH@0hibEF0H@0hidEF0jpgHE0HE0GM0"),
  a:unpackAnimation("*still*PZ]]]X]XS]]W*]E*YH*^H**ZE*YE*ZE*****shoot*B]]]]a[N_]]`*_<*W>*`>*[<*j<*]<*N<*[<*e<*`<*V<*run*D\\]]]e]TPhW_*Y?***^?*O?*T?*e?*`?*T?*i?*R?*runshot*D]]]]h]LdiU]****Y?*N?**P?*S?*W?*m?**gethit*JS]]bd^mdmH]*I=*W=*b=**M=*Y=*@=WA*U=JA*p=MA*a=_A**jump*V]]]`_a`V[Z]*[?***c?*M?*W?*G?**M?*L?*\\?"),
  c:["rgba(0,0,0,1.0)",nocolor,"rgba(249,79,0,1.0)","rgba(138,131,248,1.0)","rgba(247,185,0,1.0)"]
}


let loadModelData=()=>{

  playerModel = new CoolPath(0,0,pdata,1.5);
  playerModel.selectAnimation(1);
  aboutModel=new CoolPath(0,0,abdata,2);
  aboutModel.selectAnimation(0);
}
