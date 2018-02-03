package org.jhipster.health.repository.search;

import org.jhipster.health.domain.Setting;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Setting entity.
 */
public interface SettingSearchRepository extends ElasticsearchRepository<Setting, Long> {
}
