package org.jhipster.health.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.health.domain.Setting;

import org.jhipster.health.repository.SettingRepository;
import org.jhipster.health.repository.search.SettingSearchRepository;
import org.jhipster.health.web.rest.errors.BadRequestAlertException;
import org.jhipster.health.web.rest.util.HeaderUtil;
import org.jhipster.health.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Setting.
 */
@RestController
@RequestMapping("/api")
public class SettingResource {

    private final Logger log = LoggerFactory.getLogger(SettingResource.class);

    private static final String ENTITY_NAME = "setting";

    private final SettingRepository settingRepository;

    private final SettingSearchRepository settingSearchRepository;

    public SettingResource(SettingRepository settingRepository, SettingSearchRepository settingSearchRepository) {
        this.settingRepository = settingRepository;
        this.settingSearchRepository = settingSearchRepository;
    }

    /**
     * POST  /settings : Create a new setting.
     *
     * @param setting the setting to create
     * @return the ResponseEntity with status 201 (Created) and with body the new setting, or with status 400 (Bad Request) if the setting has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/settings")
    @Timed
    public ResponseEntity<Setting> createSetting(@RequestBody Setting setting) throws URISyntaxException {
        log.debug("REST request to save Setting : {}", setting);
        if (setting.getId() != null) {
            throw new BadRequestAlertException("A new setting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Setting result = settingRepository.save(setting);
        settingSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /settings : Updates an existing setting.
     *
     * @param setting the setting to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated setting,
     * or with status 400 (Bad Request) if the setting is not valid,
     * or with status 500 (Internal Server Error) if the setting couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/settings")
    @Timed
    public ResponseEntity<Setting> updateSetting(@RequestBody Setting setting) throws URISyntaxException {
        log.debug("REST request to update Setting : {}", setting);
        if (setting.getId() == null) {
            return createSetting(setting);
        }
        Setting result = settingRepository.save(setting);
        settingSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, setting.getId().toString()))
            .body(result);
    }

    /**
     * GET  /settings : get all the settings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of settings in body
     */
    @GetMapping("/settings")
    @Timed
    public ResponseEntity<List<Setting>> getAllSettings(Pageable pageable) {
        log.debug("REST request to get a page of Settings");
        Page<Setting> page = settingRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/settings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /settings/:id : get the "id" setting.
     *
     * @param id the id of the setting to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the setting, or with status 404 (Not Found)
     */
    @GetMapping("/settings/{id}")
    @Timed
    public ResponseEntity<Setting> getSetting(@PathVariable Long id) {
        log.debug("REST request to get Setting : {}", id);
        Setting setting = settingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(setting));
    }

    /**
     * DELETE  /settings/:id : delete the "id" setting.
     *
     * @param id the id of the setting to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/settings/{id}")
    @Timed
    public ResponseEntity<Void> deleteSetting(@PathVariable Long id) {
        log.debug("REST request to delete Setting : {}", id);
        settingRepository.delete(id);
        settingSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/settings?query=:query : search for the setting corresponding
     * to the query.
     *
     * @param query the query of the setting search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/settings")
    @Timed
    public ResponseEntity<List<Setting>> searchSettings(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Settings for query {}", query);
        Page<Setting> page = settingSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/settings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
