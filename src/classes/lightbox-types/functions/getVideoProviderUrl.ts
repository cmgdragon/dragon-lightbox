import videoProviders from "../../../constants/videoProviders"

const getVideoProviderUrl = (resourceUrl: string, autoplay: boolean): string => {

    const provider = Object.values(videoProviders).find(provider => resourceUrl.includes(provider));
    let [url, videoId] = ['', ''];
    
    switch (provider) {
        case videoProviders.YOUTUBE:
            videoId = resourceUrl.substring(resourceUrl.lastIndexOf('/watch?v=') + 9);
            url = `https://www.youtube.com/embed/${videoId.replace(`t=`, 'start=')}`;
            break;
        case videoProviders.DAILYMOTION:
            videoId = resourceUrl.substring(resourceUrl.lastIndexOf('/') + 1);
            url = `https://www.dailymotion.com/embed/video/${videoId}`;
            break;
        case videoProviders.VIMEO:
            videoId = resourceUrl.substring(resourceUrl.lastIndexOf('/') + 1);
            url = `https://player.vimeo.com/video/${videoId}`;
            break;
        default:
            return url;
    }

    const qmark = url.includes('?') ? '' : '?';
    url += autoplay ? `${qmark}&autoplay=1`: '';
    return url;
}

export default getVideoProviderUrl;