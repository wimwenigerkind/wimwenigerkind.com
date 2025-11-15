import {visitExperience, visitHome} from "./helpers/default.js";

export const options = {
    vus: 10,
    duration: '30s',
};

export default function() {
    visitHome()
    visitExperience()
}
