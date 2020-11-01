import getDateFromData from '../../lib/getDate'

export default function CommentHeader({ postData }) {
  return (
    <div htmlFor="header" className="flex items-center mb-1">
      <div
        className="rounded-full h-8 w-8 flex justify-center text-xl text-white font-medium"
        style={{ backgroundColor: '#AB3B61' }}
      >
        {postData.user[0].toUpperCase()}
      </div>
      <p
        className="ml-2 font-medium"
        style={{ fontFamily: 'Mitr', color: '#8E8E8E', marginTop: '0.125rem' }}
      >
        {postData.user}
      </p>
      <p
        className="ml-4 text-xs mt-1"
        style={{ fontFamily: 'Lato', color: '#8E8E8E' }}
      >
        {getDateFromData(postData.time)}
      </p>
    </div>
  )
}
