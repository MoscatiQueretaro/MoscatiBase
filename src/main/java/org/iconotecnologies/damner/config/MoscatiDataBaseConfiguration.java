package org.iconotecnologies.damner.config;

import java.util.HashMap;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(
    basePackages = "org.iconotecnologies.damner",
    entityManagerFactoryRef = "moscatiEntityManager",
    transactionManagerRef = "moscatiTransactionManager"
)
@EnableJpaAuditing(auditorAwareRef = "springSecurityAuditorAware")
public class MoscatiDataBaseConfiguration {

    @Bean(name = "moscatiHibernateProps")
    @ConfigurationProperties(prefix = "moscati.hibernate")
    public Map<String, Object> hibernateProps() {
        return new HashMap<>();
    }

    @Bean
    @Primary
    @ConfigurationProperties("moscati.datasource")
    public DataSourceProperties moscatiDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @Primary
    public DataSource localDataSource() {
        DataSourceProperties properties = this.moscatiDataSourceProperties();
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName(properties.getDriverClassName());
        dataSourceBuilder.url(properties.getUrl());
        dataSourceBuilder.username(properties.getUsername());
        dataSourceBuilder.password(properties.getPassword());
        return dataSourceBuilder.build();
    }

    @Bean(name = "moscatiEntityManager")
    @Primary
    public LocalContainerEntityManagerFactoryBean localEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        return builder
            .dataSource(localDataSource())
            .packages("org.iconotecnologies.damner")
            .properties(PropertyUtils.parsePropertyMap(this.hibernateProps(), "hibernate"))
            .persistenceUnit("spring")
            .build();
    }

    @Bean(name = "moscatiTransactionManager")
    @Primary
    public PlatformTransactionManager localTransactionManager(EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(localEntityManagerFactory(builder).getObject());
    }
}
