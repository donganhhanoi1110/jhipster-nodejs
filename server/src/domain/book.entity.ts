/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { User } from './user.entity';

/**
 * A Book.
 */
@Entity('book')
export class Book extends BaseEntity {
  @Column({ name: 'title', length: 150 })
  title: string;

  @Column({ name: 'author', nullable: true })
  author: string;

  @Column({ name: 'year', nullable: true })
  year: string;

  @ManyToOne(type => User)
  manyUserToOneBook: User;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
