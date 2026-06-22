function encodeCursor(product) {

    return Buffer.from(

        JSON.stringify({

            updated_at: product.updated_at,

            id: product.id

        })

    ).toString("base64");

}

function decodeCursor(cursor){

    return JSON.parse(

        Buffer.from(cursor,"base64")

        .toString()

    );

}

module.exports = {

encodeCursor,

decodeCursor

};