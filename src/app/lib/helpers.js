

    export  const isNovelty = (novelties, productId) => {
        return novelties.some(novelty => novelty.product_id === productId);
    };

    export  const isOutlet = (outlets, productId) => {
        return outlets.some(outlet => outlet.product_id === productId);
    };