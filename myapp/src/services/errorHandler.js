export default function errorHandler (err) => {
    let errorMsg = '';
    switch(){
        case err.status === 400 {
            errorMsg = 'Bad Request'
            return errorMsg
        }
    }
}