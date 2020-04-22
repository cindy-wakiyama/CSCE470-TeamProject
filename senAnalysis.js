const MonkeyLearn = require('monkeylearn')

const ml = new MonkeyLearn('83aef94645c19e4fbcddaead6956ed25d63c9cf8')
let model_id = 'cl_pi3C7JiL'
let data = ["I do not like music!"]
var outpt
ml.classifiers.classify(model_id, data).then(res => {
    outpt = res.body
    console.log(res.body)
    console.log(JSON.stringify(outpt, null, 4))
})
