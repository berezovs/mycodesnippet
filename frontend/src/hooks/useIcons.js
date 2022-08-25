import React from "react";
import {
    SiJavascript,
    SiJava,
    SiTypescript,
    SiCplusplus,
    SiPython,
    SiCss3,
    SiHtml5,
    SiCsharp,
    SiPhp,
    SiKotlin
} from "react-icons/si";

const useIcons = () => {
    const iconSize = 24;
    const languageIcons = {
        'Javascript': <SiJavascript size={iconSize} color={'purple'} />,
        'Java': <SiJava size={iconSize} color={'purple'} />,
        'C++': <SiCplusplus size={iconSize} color={'purple'} />,
        'C#': <SiCsharp size={iconSize} color={'purple'} />,
        'PHP': <SiPhp size={iconSize} color={'purple'} />,
        'HTML': <SiHtml5 size={iconSize} color={'purple'} />,
        'CSS': <SiCss3 size={iconSize} color={'purple'} />,
        'Python': <SiPython size={iconSize} color={'purple'} />,
        'Kotlin': <SiKotlin size={iconSize} color={'purple'} />,
        'Typescript': <SiTypescript size={iconSize} color={'purple'} />
    }

    return  {languageIcons}
}

export default useIcons