const projectButtonReduce = (state=null, action) => {
    switch (action.type) {
        case 'SAVE':
            console.log("save");
            return state;


        default:
            break;

    }
}
export default projectButtonReduce;
