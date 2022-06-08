import Model from "#Utils/Model";

const Config = Model('config');

Config.insertAsync({ _id: 'brightness', value: 1 }).catch(()=>{});
Config.insertAsync({ _id: 'logLevel', value: 'info' }).catch(()=>{});

export default Config;
