type Props = {
  fileid: string;
  tags: string[];
  title: string;
  description: string;
  image: string;
};

export default function LevelCard({
  title,
  description,
  image,
  fileid,
  tags,
}: Props) {
  return (
    <article className="no-padding round large-height">
      <img className="responsive large top-round" alt={title} src={image} />
      <div className="padding">
        <h5 className="overflow-wrap-anywhere">
          <a href={`/items/${fileid}`}>{title}</a>
        </h5>
        <div className="flex top-margin">
          {tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
        <p>{truncate(description, 80)}</p>
        <nav>
          <a href={`/items/${fileid}`}>Detail</a>
        </nav>
      </div>
    </article>
  );
}

const truncate = (str: string, len: number) => {
  return str.length <= len ? str : `${str.substring(0, len)}...`;
};
