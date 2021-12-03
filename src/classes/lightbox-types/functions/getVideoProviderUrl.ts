import videoProviders from "../../../constants/videoProviders"

const getVideoProviderUrl = (resourceUrl: string, autoplay: boolean): string => {

    const provider = Object.values(videoProviders).find(provider => resourceUrl.includes(provider));
    let [url, videoId] = ['', ''];
    
    switch (provider) {
        case videoProviders.YOUTUBE:
            const videoIdParams = resourceUrl.substr(resourceUrl.lastIndexOf('watch?v=') + 8)
            videoId = videoIdParams.substr(0, videoIdParams.includes('?') ? videoIdParams.indexOf('?') : videoIdParams.includes('&') ? videoIdParams.indexOf('&') : undefined);
            const params = videoIdParams.substr(videoIdParams.indexOf(videoIdParams.includes('?') ? '?' : '&'))
                .replace('s', '').replace(`&t=`, '?start=').replace(`?t=`, '?start=')
            url = `https://www.youtube.com/embed/${videoId}${params.length > 1 ? params:''}`;
            break;
        case videoProviders.DAILYMOTION:
            videoId = resourceUrl.substr(resourceUrl.lastIndexOf('/') + 1);
            url = `https://www.dailymotion.com/embed/video/${videoId}`;
            break;
        case videoProviders.VIMEO:
            videoId = resourceUrl.substr(resourceUrl.lastIndexOf('/') + 1);
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