import videoProviders from "../../../constants/videoProviders"

const getVideoProviderUrl = (resourceUrl: string, autoplay: boolean): string => {

    const provider = Object.values(videoProviders).find(provider => resourceUrl.includes(provider));
    let [url, videoId] = ['', ''];
    
    switch (provider) {
        case videoProviders.YOUTUBE:
            url = resourceUrl;
            if (!resourceUrl.includes('/embed')) {
                const videoIdParams = resourceUrl.substring(resourceUrl.lastIndexOf('watch?v=') + 8)
                videoId = videoIdParams.substring(0, videoIdParams.includes('?') ? videoIdParams.indexOf('?') : videoIdParams.includes('&') ? videoIdParams.indexOf('&') : undefined);
                const validParams = ['t', 'start']
                let params: string | string[] = videoIdParams.replace(videoId, '').replace('?', '').split('&').filter(p => validParams.includes(p.split('=')[0]));
                params = params.map(p => {
                    const keyValue = p.split('=')
                    return keyValue[0] && keyValue[1] ? `${keyValue[0]}=${keyValue[1].replace('s', '')}` : ''
                }).join()
                params = params.replace(`t=`, 'start=')
                url = `https://www.youtube.com/embed/${videoId}${params.length > 1 ? `?${params}` : ''}`;
            }
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