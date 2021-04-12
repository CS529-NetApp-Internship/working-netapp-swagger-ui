export default function(models, phrase) {
    return models.filter((model, name) => name.indexOf(phrase) !== -1)
}