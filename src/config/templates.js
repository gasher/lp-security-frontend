import config from './index';

export const generateConfigFile = (camera_id, camera_ip) => `
{
    "token": "${localStorage.getItem('token')}",
    "camera_id": ${camera_id},
    "camera_ip": "${camera_ip}",
    "server_ip": "${config.api.baseURL}"
}
`;

export default generateConfigFile;
