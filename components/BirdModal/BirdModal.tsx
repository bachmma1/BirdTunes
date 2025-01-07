import { Species } from "hooks/useFetchSpecies";

import { Modal } from "components/Modal/Modal";
import styles from "./BirdModal.module.scss";
import { dateDetailed } from "utils/date";
import { useFetchDetections } from "hooks/useFetchDetections";
import { Spinner } from "components/Spinner";
import { AudioPlayer } from "components/AudioPlayer";
import { Block } from "components/Block";

type BirdModalProps = {
  data: Species & { stationId: string | null; lang: string | null };
  isOpen: boolean;
  onClose: () => void;
};

export function BirdModal({ data: bird, isOpen, onClose }: BirdModalProps) {
  const { data, isLoading, error } = useFetchDetections({
    speciesId: bird.id,
    stationId: bird.stationId,
    lang: bird.lang,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <img
          src={bird.imageUrl}
          alt={bird.commonName}
          className={styles.image}
          loading="eager"
          width={400}
          height={400}
        />

        <div className={styles.header}>
          <h2>{bird.commonName}</h2>

          <p className="color-muted">
            <em>
              <a
                href={`https://snl.no/${bird.commonName.toLowerCase()}`}
                target="_blank"
                rel="noreferrer"
                title="Gå til Store norske leksikon"
              >
                {bird.scientificName}
              </a>
            </em>
          </p>

          <p>{bird.detections.total} observasjoner</p>
        </div>

        <div className={styles.detections}>
          <Block bottom="3">
            <h2 className="h4">Siste {data?.length} observasjoner</h2>
          </Block>

          {isLoading && <Spinner />}

          {error && (
            <p className="color-red">
              Det skjedde en feil ved henting av data.
            </p>
          )}

          {data?.map((detection) => (
            <div key={detection.id} className={styles.detection}>
              {detection?.soundscape?.url && (
                <AudioPlayer url={detection.soundscape.url} />
              )}
              <p>{dateDetailed(detection.timestamp)}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
