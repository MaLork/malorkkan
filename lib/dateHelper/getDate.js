export default function getDateFromData({ data }) {
  return new Date(data.time).toLocaleDateString()
}
