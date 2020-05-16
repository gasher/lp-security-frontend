import config from './index';

export const generateConfigFile = camera_id => `
{
    "token": "${localStorage.getItem('token')}",
    "camera_id": ${camera_id},
    "server_ip": "${config.api.baseURL}"
}
`;

export default generateConfigFile;
