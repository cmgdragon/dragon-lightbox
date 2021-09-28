import videoProviders from "../../../constants/videoProviders"

const getVideoProviderUrl = (resourceUrl: string): string => {

    const provider = videoProviders.find(provider => resourceUrl.includes(provider));
    
    if (provider === 'youtube') {
        const videoId = resourceUrl.substring(resourceUrl.lastIndexOf('/watch?v=') + 9);
        return `https://www.youtube.com/embed/${videoId}`;
    }

    if (provider === 'daylimotion') {
        const videoId = resourceUrl.substring(resourceUrl.lastIndexOf('/') + 1);
        return `https://www.dailymotion.com/embed/video/${videoId}`;
    }

    if (provider === 'vimeo') {
        const videoId = resourceUrl.substring(resourceUrl.lastIndexOf('/') + 1);
        return `https://player.vimeo.com/video/${videoId}`;
    }

    return '';

}

export default getVideoProviderUrl;