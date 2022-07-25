package org.iconotecnologies.damner.config;

import java.util.HashMap;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@ComponentScan(basePackages = "org.iconotecnologies.rk")
@EnableJpaRepositories(
    basePackages = "org.iconotecnologies.rk",
    entityManagerFactoryRef = "rkEntityManager",
    transactionManagerRef = "rkTransactionManager"
)
public class RKDataBaseConfiguration {

    @Bean(name = "rkHibernateProps")
    @ConfigurationProperties(prefix = "rk.hibernate")
    public Map<String, Object> hibernateProps() {
        return new HashMap<>();
    }

    @Bean
    @ConfigurationProperties("rk.datasource")
    public DataSourceProperties rkDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    public DataSource rkDataSource() {
        DataSourceProperties properties = this.rkDataSourceProperties();
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName(properties.getDriverClassName());
        dataSourceBuilder.url(properties.getUrl());
        dataSourceBuilder.username(properties.getUsername());
        dataSourceBuilder.password(properties.getPassword());
        return dataSourceBuilder.build();
    }

    @Bean(name = "rkEntityManager")
    public LocalContainerEntityManagerFactoryBean rkEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        return builder
            .dataSource(rkDataSource())
            .packages("org.iconotecnologies.rk")
            .properties(PropertyUtils.parsePropertyMap(this.hibernateProps(), "hibernate"))
            .persistenceUnit("rk")
            .build();
    }

    @Bean(name = "rkTransactionManager")
    public PlatformTransactionManager rkTransactionManager(EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(rkEntityManagerFactory(builder).getObject());
    }
}
